from __future__ import absolute_import
from .Interface import Interface


class BrowserItem(Interface):
    @staticmethod
    def serialize_browser_item(browser_item):
        if browser_item is None:
            return None
        browser_item_id = Interface.save_obj(browser_item)
        return {
            "id": browser_item_id,
            "name": browser_item.name,
            "is_loadable": browser_item.is_loadable,
            "is_selected": browser_item.is_selected,
            "is_device": browser_item.is_device,
            "is_folder": browser_item.is_folder,
            "source": browser_item.source,
            "uri": browser_item.uri,
        }

    def __init__(self, c_instance, socket):
        super(BrowserItem, self).__init__(c_instance, socket)

    def get_children(self, ns):
        return map(BrowserItem.serialize_browser_item, ns.children)
