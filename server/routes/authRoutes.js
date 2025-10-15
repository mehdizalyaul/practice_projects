import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", verifyToken, login);

export default router;
