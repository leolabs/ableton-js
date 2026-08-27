
from .Interface import Interface


class DeviceView(Interface):
    def get_ns(self, nsid):
        return Interface.get_obj(nsid).view
