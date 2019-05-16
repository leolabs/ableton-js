import sys

from RemoteControl import RemoteControl


def create_instance(c_instance):
    log("Initialized RemoteTest")
    log(dir(c_instance.song()))
    log(sys.version)
    return RemoteControl(c_instance)


def log(message):
    sys.stderr.write("RemoteTest LOG: " + str(message).encode('utf-8'))
