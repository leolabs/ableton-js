from __future__ import absolute_import
import time
from .Config import FAST_POLLING
from .Logging import logger
from .UDPSocket import Socket
from .Interface import Interface

from .AbletonJSBase import AbletonJSBase
import Live


class AbletonJSUDP(AbletonJSBase):
    def __init__(self, c_instance):
        super(AbletonJSUDP, self).__init__(c_instance)
        Socket.set_message(self.show_message)
        self.socket = Socket(self.command_handler)
        self._last_tick = time.time() * 1000
        self.tick()
        if FAST_POLLING:
            self.recv_loop = Live.Base.Timer(
                callback=self.socket.process, interval=10, repeat=True)

            self.recv_loop.start()

    def tick(self):
        tick_time = time.time() * 1000

        if tick_time - self._last_tick > 200:
            logger.warning("UDP tick is lagging, delta: " +
                           str(round(tick_time - self._last_tick)) + "ms")

        self._last_tick = tick_time
        self.socket.process()

        process_time = time.time() * 1000

        if process_time - tick_time > 100:
            logger.warning("UDP processing is taking long, delta: " +
                           str(round(tick_time - process_time)) + "ms")
        self.schedule_message(1, self.tick)

    

    def disconnect(self):
        logger.info("Disconnecting")
        if FAST_POLLING:
            self.recv_loop.stop()
        self.socket.send("disconnect")
        self.socket.shutdown()
        Interface.listeners.clear()
        super(AbletonJSUDP, self).disconnect()

