from __future__ import absolute_import
from .Interface import Interface
from .version import version


class Internal(Interface):
    def __init__(self, c_instance, socket):
        super(Internal, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self

    def get_ping(self, nsid):
        return True

    def get_version(self, ns):
        return version

    def set_client_port(self, nsid, port):
        self.socket.set_client_port(port)
        return True
