from __future__ import absolute_import

import sys


def create_instance(c_instance):
    if sys.version_info[0] < 3:
        from .Unsupported import Unsupported

        return Unsupported(c_instance)

    from .AbletonJS import AbletonJS

    return AbletonJS(c_instance)
