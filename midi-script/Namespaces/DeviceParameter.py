
import Live

from ..Utils import enum_name
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

    def __init__(self, c_instance, socket):
        super().__init__(c_instance, socket)

    def get_automation_state(self, ns):
        return enum_name(Live.DeviceParameter.AutomationState, ns.automation_state)

    def get_state(self, ns):
        return enum_name(Live.DeviceParameter.ParameterState, ns.state)
