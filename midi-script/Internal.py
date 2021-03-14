from __future__ import absolute_import
from .Interface import Interface


class Internal(Interface):
    def __init__(self, c_instance, socket):
        super(Internal, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self

    def get_version(self, ns):
        return "1.14.3"
