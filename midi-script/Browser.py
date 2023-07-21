from __future__ import absolute_import
from .Interface import Interface
from .BrowserItem import BrowserItem


def is_browser_item(obj):
    required_attributes = ['iter_children']
    return all(hasattr(obj, attr) for attr in required_attributes)


def get_all_items(iterable):
    item_list = []
    for item in iterable:
        if is_browser_item(item):
            item_list.extend(item.children)
        else:
            item_list.append(item)
    return item_list


class Browser(Interface):
    @staticmethod
    def serialize_browser(browser):
        if browser is None:
            return None
        browser_id = Interface.save_obj(browser)
        return {
            "audio_effects": browser.audio_effects,
            "id": browser_id,
            "clips": browser.clips,
            "colors": browser.colors,
            "current_project": browser.current_project,
            "drums": browser.drums,
            "instruments": browser.instruments,
            "max_for_live": browser.max_for_live,
            "midi_effects": browser.midi_effects,
            "packs": browser.packs,
            "plugins": browser.plugins,
            "samples": browser.samples,
            "sounds": browser.sounds,
            "user_folders": browser.user_folders,
            "user_library": browser.user_library,
            "hotswap_target": browser.hotswap_target,
        }

    def __init__(self, c_instance, socket):
        super(Browser, self).__init__(c_instance, socket)

    def get_audio_effects(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.audio_effects.iter_children])

    def get_clips(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.clips.iter_children])

    def load_item(self, ns, id):
        ns.load_item(self.get_obj(id))

    def get_colors(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.colors])

    def get_current_project(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.current_project.iter_children])

    def get_drums(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.drums.iter_children])

    def get_instruments(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.instruments.iter_children])

    def get_max_for_live(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.max_for_live.iter_children])

    def get_midi_effects(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.midi_effects.iter_children])

    def get_packs(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.packs.iter_children])

    def get_plugins(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.plugins.iter_children])

    def get_samples(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.samples.iter_children])

    def get_sounds(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.sounds.iter_children])

    def get_user_folders(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.user_folders])

    def get_user_library(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.user_library.iter_children])

    def get_hotswap_target(self, ns):
        return BrowserItem.serialize_browserItem(ns.hotswap_target)

    def preview_item(self, ns, id):
        ns.preview_item(self.get_obj(id))

    def stop_preview(self, ns):
        ns.stop_preview()
