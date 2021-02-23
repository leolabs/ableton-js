from AbletonJS.Interface import Interface
from AbletonJS.DeviceParameter import DeviceParameter


class Device(Interface):
    @staticmethod
    def serialize_device(device):
        if device is None:
            return None

        device_id = Interface.save_obj(device)
        return {
            "id": device_id,
            "name": device.name,
            "type": str(device.type),
            "class_name": device.class_name,
        }

    def __init__(self, c_instance, socket):
        super(Device, self).__init__(c_instance, socket)

    def get_parameters(self, ns):
        return list(map(DeviceParameter.serialize_device_paramater, ns.parameters))
