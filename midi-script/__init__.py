# This is needed to import the Unsupported class in Live 10
from __future__ import absolute_import  # noqa: UP010

import sys


def create_instance(c_instance):
    if sys.version_info[0] < 3:  # noqa: UP036
        from .Unsupported import Unsupported

        return Unsupported(c_instance)

    from .AbletonJS import AbletonJS

    return AbletonJS(c_instance)
