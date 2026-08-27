from __future__ import absolute_import

import Live

from .Interface import Interface


class ApplicationView(Interface):
    def __init__(self, c_instance, socket, application):
        super().__init__(c_instance, socket)
        self.application = application

    def get_ns(self, nsid=None):
        return self.application.view

    def scroll_view(self, ns, direction, view, modifier_pressed=False):
        return ns.scroll_view(
            getattr(Live.Application.Application.View.NavDirection, str(direction)),
            view,
            modifier_pressed,
        )

    def zoom_view(self, ns, direction, view, modifier_pressed=False):
        return ns.zoom_view(
            getattr(Live.Application.Application.View.NavDirection, str(direction)),
            view,
            modifier_pressed,
        )
