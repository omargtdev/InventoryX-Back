
const mapToUserProfile = (user) => {
    if(!user)
        return null;

    const { _id: id, name, last_name, username,
            email, address, phone,
            photo_url, permissions } = user;

    const mappedUser = {
        id: id.toString(), name, last_name, username,
        email, address, phone, photo_url, permissions
    };

    return mappedUser;
}

const mapToCreatedUser = (user) => {
    if(!user)
        return null;

    const { _id: id, name, last_name, username,
            email, address, phone, password,
            photo_url, permissions } = user;

    const mappedUser = {
        id: id.toString(), name, last_name, username,
        email, address, phone,
        phone, photo_url, permissions,
		temporal_password: password
    };

    return mappedUser;
}

const mapToDefault = (user) => {
    if(!user)
        return null;

    const mappedUser = {
        id: user._id.toString(),
        ...user
    }
    delete mappedUser._id;
    return mappedUser;
}

export const MappingTypes = {
	PROFILE: "PROFILE",
	CREATED_USER: "CREATED_USER",
	NONE: "NONE"
}

export const mapper = (type, user, extraAttributes = {}) => {
	let userToMapped = { ...user._doc };

	if(Object.hasProperties(extraAttributes))
		userToMapped = Object.assign(userToMapped, extraAttributes);

	const options = {
		PROFILE: user => mapToUserProfile(user),
		CREATED_USER: user => mapToCreatedUser(user),
		NONE: user => mapToDefault(user)
	}

	return options[type](userToMapped);
}

