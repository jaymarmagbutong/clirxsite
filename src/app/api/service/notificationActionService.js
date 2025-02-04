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
                    <span style='font-weight: 600;'>${actor}</span> created page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "update-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> updated page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "delete-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> deleted page
                    <span style='font-weight: 600;'>${pageTitle}</span>
                `;
            case "assign-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> assigned
                    <span style='font-weight: 600;'>${pageTitle}</span> page to 
                    <span style='font-weight: 600;'>${assignee}</span>
                `;
            case "update-category":
                return `
                    <span style='font-weight: 600;'>${actor}</span> updated category
                    <span style='font-weight: 600;'>${categoryName}</span>
                `;
            case "approved-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> approved page
                    <span style='font-weight: 600;'>${pageTitle}</span> from
                    <span style='font-weight: 600;'>${assignee}</span>
                `;
            case "create-category":
                return `
                    <span style='font-weight: 600;'>${actor}</span> created category
                    <span style='font-weight: 600;'>${categoryName}</span>
                `;
            case "modify-page":
                return `
                    <span style='font-weight: 600;'>${actor}</span> modified
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
      
            // if (action.type === "delete-page" || action.type === "assign-page") {
            //     return `
            //         <span style='font-weight: 600;'>${action.created_by_username}</span> performed a restricted action.
            //     `;
            // }
            return generateMessage(action.type, action, user_id);
        default:
            // Default handling for unknown roles
            return generateMessage(action.type, action, user_id);
    }
}