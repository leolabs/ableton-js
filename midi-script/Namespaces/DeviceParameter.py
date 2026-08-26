from __future__ import absolute_import

import Live

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
            "is_quantized": param.is_quantized,
        }

    @staticmethod
    def _enum_name(enum_cls, value):
        # Live's DeviceParameter enums stringify as "0"/"1"/… rather than names.
        value = int(value)
        for name in dir(enum_cls):
            if int(getattr(enum_cls, name)) == value:
                return name
        return str(value)

    def __init__(self, c_instance, socket):
        super(DeviceParameter, self).__init__(c_instance, socket)

    def get_automation_state(self, ns):
        return DeviceParameter._enum_name(
            Live.DeviceParameter.AutomationState, ns.automation_state
        )

    def get_state(self, ns):
        return DeviceParameter._enum_name(Live.DeviceParameter.ParameterState, ns.state)
