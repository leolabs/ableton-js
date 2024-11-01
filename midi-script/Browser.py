from __future__ import absolute_import
from .Interface import Interface
from .BrowserItem import BrowserItem


class Browser(Interface):
    def __init__(self, c_instance, socket, application):
        super(Browser, self).__init__(c_instance, socket)
        self.application = application

    def get_ns(self, nsid=None):
        return self.application.browser

    def get_audio_effects(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.audio_effects.children)

    def get_clips(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.clips.children)

    def get_colors(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.colors)

    def get_current_project(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.current_project.children)

    def get_drums(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.drums.children)

    def get_instruments(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.instruments.children)

    def get_max_for_live(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.max_for_live.children)

    def get_midi_effects(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.midi_effects.children)

    def get_packs(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.packs.children)

    def get_plugins(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.plugins.children)

    def get_samples(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.samples.children)

    def get_sounds(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.sounds.children)

    def get_user_folders(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.user_folders)

    def get_user_library(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.user_library.children)

    def get_hotswap_target(self, ns):
        return BrowserItem.serialize_browser_item(ns.hotswap_target)

    def load_item(self, ns, id):
        return ns.load_item(self.get_obj(id))

    def preview_item(self, ns, id):
        return ns.preview_item(self.get_obj(id))

    def stop_preview(self, ns):
        return ns.stop_preview()
