from Interface import Interface
from ClipSlot import ClipSlot


class Scene(Interface):
    @staticmethod
    def serialize_scene(scene):
        if scene is None:
            return None

        scene_id = Interface.save_obj(scene)
        return {"id": scene_id, "name": scene.name, "color": scene.color}

    def __init__(self, c_instance, socket):
        super(Scene, self).__init__(c_instance, socket)

    def get_clip_slots(self, ns):
        return map(ClipSlot.serialize_clip_slot, ns.clip_slots)