from __future__ import absolute_import
from .Interface import Interface


class BrowserItem(Interface):
    @staticmethod
    def serialize_browserItem(browserItem):
        if browserItem is None:
            return None
        browserItem_id = Interface.save_obj(browserItem)
        return {
            "id": browserItem_id,
            "name": browserItem.name,
            "is_loadable": browserItem.is_loadable,
            "is_selected": browserItem.is_selected,
            "is_device": browserItem.is_device,
            "is_folder": browserItem.is_folder,
            "source": browserItem.source,
            "uri": browserItem.uri,
        }

    def __init__(self, c_instance, socket):
        super(BrowserItem, self).__init__(c_instance, socket)

    def get_iter_children(self, ns):
        return map(BrowserItem.serialize_browserItem, [*ns.iter_children])
