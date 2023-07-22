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
    def __init__(self, c_instance, socket, application):
        super(Browser, self).__init__(c_instance, socket)
        self.application = application

    def get_ns(self, nsid=None):
        return self.application.browser

    def get_audio_effects(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.audio_effects.iter_children])

    def get_clips(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.clips.iter_children])

    def get_colors(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.colors])

    def get_current_project(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.current_project.iter_children])

    def get_drums(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.drums.iter_children])

    def get_instruments(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.instruments.iter_children])

    def get_max_for_live(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.max_for_live.iter_children])

    def get_midi_effects(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.midi_effects.iter_children])

    def get_packs(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.packs.iter_children])

    def get_plugins(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.plugins.iter_children])

    def get_samples(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.samples.iter_children])

    def get_sounds(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.sounds.iter_children])

    def get_user_folders(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.user_folders])

    def get_user_library(self, ns):
        return map(BrowserItem.serialize_browser_item, [*ns.user_library.iter_children])

    def get_hotswap_target(self, ns):
        return BrowserItem.serialize_browser_item(ns.hotswap_target)

    def load_item(self, ns, id):
        ns.load_item(self.get_obj(id))

    def preview_item(self, ns, id):
        ns.preview_item(self.get_obj(id))

    def stop_preview(self, ns):
        ns.stop_preview()
