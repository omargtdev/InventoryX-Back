
const mapToNormal = (user) => {
    const { id, name,
						last_name, username,
            email, address,
						document_type, document_number,
						phone, is_admin, is_active,
            photo_url, permissions, is_deleted,
						created_at, updated_at, deleted_at } = user;

    const mappedUser = {
        id, name, last_name, username,
        email, address, document_type, document_number,
				phone, is_admin, is_active,
				photo_url, permissions, is_deleted,
        created_at, updated_at, deleted_at
    };

    return mappedUser;
}

const mapToCreatedUser = (user) => {
	const mappedUser = mapToNormal(user);
	mappedUser.temporal_password = user.password;

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
	NORMAL: "NORMAL",
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
		NORMAL: user => mapToNormal(user),
		CREATED_USER: user => mapToCreatedUser(user),
		NONE: user => mapToDefault(user)
	}

	return options[type](userToMapped);
}

