export function NotificationActionService(action, user) {
    const user_id = user.id;
    const user_role = user.role; // Assuming user.role contains the role (e.g., "admin", "editor", "viewer")

    // Map action types to human-readable strings
    const actionMap = {
        "create-page": " created a page",
        "update-page": " updated a page",
        "delete-page": " deleted a page",
        "assign-page": " assigned a page",
        "update-category": " updated a category",
        "approved-page": " approved a page",
        "create-category": " created a category",
        "modify-page": " modified a page",
        // Add more action types as needed
    };

    // Function to generate notification message based on user role
    const generateMessage = (actionType, action, user_id) => {
        const actor = (action.user_created == user_id) ? 'You' : action.created_by_username;
        const pageTitle = action.page_title ? `<span style='font-weight: 600;'>${action.page_title}</span>` : '';
        const categoryName = action.category_name ? `<span style='font-weight: 600;'>${action.category_name}</span>` : '';
        const assignee = action.user_id ? (action.user_id == user_id ? 'You' : action.assigned_to_username) : '';

        switch (actionType) {
            case "create-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>created</span> page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "update-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>updated</span> page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "delete-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>deleted</span> page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "assign-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>assigned</span> page
                    <span style='font-weight: 600;'>${pageTitle}</span>  to 
                    <span style='font-weight: 600;'>${assignee}</span>
                `;
            case "update-category":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>updated category</span>
                    <span style='font-weight: 600;'>${categoryName}</span>
                `;
            case "approved-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>approved page</span>
                    <span style='font-weight: 600;'>${pageTitle}</span> from
                    <span style='font-weight: 600;'>${assignee}</span>
                `;
            case "create-category":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>created category</span>
                    <span style='font-weight: 600;'>${categoryName}</span>
                `;
            case "modify-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> <span style='font-weight: 600;font-style: italic;'>modified</span>
                    <span style='font-weight: 600;'>${pageTitle}</span> page
                `;
            default:
                return actionMap[actionType] || actionType.replace(/-/g, ' ');
        }
    };

    // Customize messages based on user role
    switch (user_role) {
        case 1:
            // Admin sees all detailed notifications
            return generateMessage(action.type, action, user_id);
        case 2:
            // Editor sees all detailed notifications except for sensitive actions
            return generateMessage(action.type, action, user_id);
        case 3:
            // Viewer sees simplified notifications
            return generateMessage(action.type, action, user_id);
        default:
            // Default handling for unknown roles
            return generateMessage(action.type, action, user_id);
    }
}