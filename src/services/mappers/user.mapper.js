
const mapToUserProfile = (user) => {
    const { id, name, last_name, username,
            email, address, phone, is_admin,
            photo_url, permissions } = user;

    const mappedUser = {
        id, name, last_name, username,
        email, address, phone, is_admin,
        phone, photo_url, permissions
    };

    return mappedUser;
}

export default {
		mapToUserProfile
}

