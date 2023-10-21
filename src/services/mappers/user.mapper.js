
const mapToUserProfile = (user) => {
    const { id, name, last_name, username,
            email, address, phone, is_admin,
            photo_url, permissions, created_at, updated_at } = user;

    const mappedUser = {
        id, name, last_name, username,
        email, address, phone, photo_url, permissions,
        created_at, updated_at, is_admin
    };

    return mappedUser;
}

const mapToCreatedUser = (user) => {
    const { id, name, last_name, username,
            email, address, phone, is_admin,
						password, photo_url, permissions } = user;

    const mappedUser = {
        id, name, last_name, username,
        email, address, phone, is_admin,
        phone, photo_url, permissions,
				temporal_password: password
    };

    return mappedUser;
}

const mapToDefault = (user) => {
    const mappedUser = {
        ...user
    }

    delete mappedUser._id;
    delete mappedUser.__v;

    return mappedUser;
}

export const MappingTypes = {
	PROFILE: "PROFILE",
	CREATED_USER: "CREATED_USER",
	NONE: "NONE"
}

export const mapper = (type, user, extraAttributes = {}, deleteAttributes = []) => {
    if(!user)
        return null;

	let userToMapped = { ...user._doc };

	if(Object.hasProperties(extraAttributes))
		userToMapped = Object.assign(userToMapped, extraAttributes);

    deleteAttributes.forEach(attribute => {
        delete userToMapped[attribute];
    });

	const options = {
		PROFILE: user => mapToUserProfile(user),
		CREATED_USER: user => mapToCreatedUser(user),
		NONE: user => mapToDefault(user)
	}

	return options[type](userToMapped);
}

