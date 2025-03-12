from __future__ import absolute_import
from .Interface import Interface
from .Logging import logger

from _Framework.SessionComponent import SessionComponent


class Session(Interface):
    def __init__(self, c_instance, socket, controlSurface):
        super(Session, self).__init__(c_instance, socket)

        self.controlSurface = controlSurface
        self.sessionComponent = SessionComponent

    def get_ns(self, nsid=None):
        return self

    def setup_session_box(self, ns, num_tracks=2, num_scenes=2):
        """
        Creates the session with the red ring box.
        """
        with self.controlSurface.component_guard():
            logger.info(
                "Setting up session box with " + str(num_tracks) + " tracks and " + str(num_scenes) + " scenes.")
            self.session = self.sessionComponent(num_tracks, num_scenes)
            self.session.set_offsets(0, 0)
            self.controlSurface.set_highlighting_session_component(
                self.session)
            return True

    def set_session_offset(self, ns, track_offset, scene_offset):
        """
        Sets the offset of the SessionComponent instance.
        """
        logger.info(
            "Moving session box offset to " + str(track_offset) + " and " + scene_offset + ".")

        if hasattr(self, 'session'):
            self.session.set_offsets(track_offset, scene_offset)
        else:
            logger.error("Session box not set up.")
        return True
