
import logging

from .Config import DEBUG, PLUGIN_NAME

logger = logging.getLogger(PLUGIN_NAME)

if DEBUG:
    logger.setLevel(logging.DEBUG)
