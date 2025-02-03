
export  function  NotificationActionService(action, user_id) {
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

    switch (action.type) {
        
        case "create-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> created page
                <span style='font-weight: 600;'>${ action.page_title }</span>
            `;
        case "update-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> updated page
                <span style='font-weight: 600;'>${ action.page_title }</span>
            `;
        case "delete-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> deleted page
                <span style='font-weight: 600;'>${ action.page_title }</span>
            `;
        case "assign-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> assigned
                <span style='font-weight: 600;'>${ action.page_title }</span> page to 
                <span style='font-weight: 600;'>${ ( action.user_id == user_id ) ? 'You' : action.assigned_to_username}</span>
                `;
        case "update-category":
            return actionMap[action.type] || action.type.replace(/-/g, ' ');
        case "approved-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> approved page
                <span style='font-weight: 600;'>${ action.page_title }</span> from
                <span style='font-weight: 600;'>${ ( action.user_id == user_id ) ? 'You' : action.assigned_to_username}</span>
            `;
        case "create-category":
            return actionMap[action.type] || action.type.replace(/-/g, ' ');
        case "modify-page":
            return `
                <span style='font-weight: 600;'>${ ( action.user_created == user_id ) ? 'You': action.created_by_username}</span> Modified
                <span style='font-weight: 600;'>${ action.page_title }</span> page to 
            `;
        default:
            return actionMap[action.type] || action.type.replace(/-/g, ' ');

    } 
}

