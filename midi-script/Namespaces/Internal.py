from __future__ import absolute_import
from ..version import version
from .Interface import Interface


class Internal(Interface):
    def __init__(self, c_instance, socket):
        super(Internal, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self

    def get_ping(self, nsid):
        return True

    def get_version(self, ns):
        return version

    def authenticate(self, ns, hash=None):
        # Socket._gate_auth already validated the hash and marked the connection.
        return True
