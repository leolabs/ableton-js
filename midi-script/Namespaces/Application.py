
import Live

from .Interface import Interface


class Application(Interface):
    def __init__(self, c_instance, socket, application):
        super().__init__(c_instance, socket)
        self.application = application

    def get_ns(self, nsid=None):
        return self.application

    def get_major_version(self, ns):
        return ns.get_major_version()

    def get_minor_version(self, ns):
        return ns.get_minor_version()

    def get_bugfix_version(self, ns):
        return ns.get_bugfix_version()

    def get_build_id(self, ns):
        return ns.get_build_id()

    def get_variant(self, ns):
        return ns.get_variant()

    def get_version(self, ns):
        if hasattr(ns, "get_version_string"):
            return ns.get_version_string()
        return f"{ns.get_major_version()}.{ns.get_minor_version()}.{ns.get_bugfix_version()}"

    # control_surfaces is not wrapped: slots are mostly in-process remote scripts
    # (_Framework.ControlSurface) whose attributes are internal framework state,
    # not useful client data. ControlSurfaceProxy (e.g. Push) is the exception,
    # but typical setups don't expose anything actionable here.

    def get_unavailable_features(self, ns):
        return [str(feature) for feature in ns.unavailable_features]

    # show_message is not wrapped: it requires a Live.Base.Text, which cannot be
    # instantiated from Python. Use show_on_the_fly_message for free-form strings.

    def show_on_the_fly_message(
        self,
        ns,
        message,
        buttons="OK_BUTTON",
        enable_markup=False,
        show_success_icon=False,
        push_dialog_type="MESSAGE_BOX",
    ):
        return ns.show_on_the_fly_message(
            message,
            getattr(Live.Application.MessageButtons, str(buttons)),
            enable_markup,
            show_success_icon,
            getattr(Live.Application.PushDialogType, str(push_dialog_type)),
        )
