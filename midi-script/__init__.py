from __future__ import absolute_import
import sys

from .AbletonJSTCP import AbletonJSTCP
from .AbletonJSUDP import AbletonJSUDP

socket_type = "UDP" # Socket type flag - not sure where else to put this, here ok?

def create_instance(c_instance):
    if socket_type == "TCP":
        return AbletonJSTCP(c_instance)
    elif socket_type == "UDP":
        return AbletonJSUDP(c_instance)
