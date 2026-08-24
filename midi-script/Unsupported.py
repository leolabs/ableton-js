from __future__ import absolute_import

from _Framework.ControlSurface import ControlSurface

_MESSAGE = "This plugin requires Live 11 or later"


class Unsupported(ControlSurface):
    """Stub ControlSurface shown when AbletonJS is loaded in Live 10."""

    def __init__(self, c_instance):
        ControlSurface.__init__(self, c_instance)
        self.log_message(_MESSAGE)
        self.show_message(_MESSAGE)

    def disconnect(self):
        ControlSurface.disconnect(self)
