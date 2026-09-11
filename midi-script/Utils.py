def enum_name(enum_cls, value):
    """
    Resolves a Live enum value to its member name.

    Live enums sometimes stringify as "0"/"1"/… rather than names, so we match by int.
    """
    value = int(value)
    for name in dir(enum_cls):
        if name.startswith("_"):
            continue
        try:
            if int(getattr(enum_cls, name)) == value:
                return name
        except (TypeError, ValueError):
            continue
    return str(value)
