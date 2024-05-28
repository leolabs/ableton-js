from __future__ import absolute_import
from .Interface import Interface


class ApplicationView(Interface):
    def __init__(self, c_instance, socket, application):
        super(ApplicationView, self).__init__(c_instance, socket)
        self.application = application

    def get_ns(self, nsid=None):
        return self.application.view
