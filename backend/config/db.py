import os
import logging
from dotenv import load_dotenv

logger = logging.getLogger("drishtiq.db")
load_dotenv()

def init_mongo():
    """
    Initializes connection to MongoDB Atlas or local MongoDB using MongoEngine/PyMongo.
    Supports mongodb+srv:// Atlas URIs with TLS/SSL.
    """
    mongodb_uri = os.getenv("MONGODB_URI", "").strip()
    db_name = os.getenv("MONGODB_DB_NAME", "drishtiq_db").strip()

    if not mongodb_uri:
        logger.warning(
            "MONGODB_URI is not set in environment. "
            "Backend is operating in decoupled/mock persistence mode for demonstration."
        )
        return False

    try:
        import mongoengine
        
        # Connect to MongoDB Atlas via MongoEngine
        mongoengine.connect(
            db=db_name,
            host=mongodb_uri,
            serverSelectionTimeoutMS=5000,
        )
        logger.info(f"Successfully connected to MongoDB Atlas database: {db_name}")
        return True
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB Atlas at {mongodb_uri}: {e}")
        return False
