from __future__ import absolute_import
from .Interface import Interface
from .Logging import logger


class Session(Interface):
    def __init__(self, c_instance, socket):
        super(Session, self).__init__(c_instance, socket)

    def get_ns(self, nsid):
        return self

    def test(self, ns, stuff):
        logger.info("Session.test" + stuff)
        return "yes"
