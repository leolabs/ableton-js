from __future__ import absolute_import
from .Interface import Interface


class Application(Interface):
    def __init__(self, c_instance, socket, application):
        super(Application, self).__init__(c_instance, socket)
        self.application = application
        self.log_message("Version: " + self.get_version(self.get_ns()))

    def get_ns(self, nsid=None):
        return self.application

    def get_major_version(self, ns):
        return ns.get_major_version()

    def get_minor_version(self, ns):
        return ns.get_minor_version()

    def get_bugfix_version(self, ns):
        return ns.get_bugfix_version()

    def get_version(self, ns):
        return str(ns.get_major_version()) + "." + str(ns.get_minor_version()) + "." + str(ns.get_bugfix_version())
