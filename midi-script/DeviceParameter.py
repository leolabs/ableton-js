from __future__ import absolute_import
from .Interface import Interface


class DeviceParameter(Interface):
    @staticmethod
    def serialize_device_parameter(param):
        if param is None:
            return None

        device_parameter_id = Interface.save_obj(param)
        return {
            "id": device_parameter_id,
            "name": param.name,
            "value": param.value,
            "is_quantized": param.is_quantized
        }

    def __init__(self, c_instance, socket):
        super(DeviceParameter, self).__init__(c_instance, socket)

    def get_value_items(self, ns):
        return list(ns.value_items)
