const usersFilter = function(v1, v2) {
	// If we don't get strings, just compare by index
	if (v1.type !== 'string' || v2.type !== 'string') {
		return (v1.index < v2.index) ? -1 : 1;
	}

	// put _new_client to the bottom
	const firstCharacter = v1.value.slice(0, 1);
	if (firstCharacter === '_') {
		return 1
	}

	// Compare strings alphabetically
	return v1.value.localeCompare(v2.value);
}

module.exports = usersFilter;