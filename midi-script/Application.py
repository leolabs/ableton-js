from __future__ import absolute_import
from .Interface import Interface
from .Logging import logger

# from _Framework.SessionComponent import SessionComponent
# from _Framework.Dependency import depends


class Application(Interface):
    def __init__(self, c_instance, socket, application):
        super(Application, self).__init__(c_instance, socket)
        self.application = application
        # Set default values for num_tracks and num_scenes

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
