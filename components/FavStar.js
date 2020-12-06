import styles from "../styles/favstar.module.css";
import Axios from "axios";
import useSWR, { trigger } from "swr";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "../context/StateProvider";

export default function FavStar({ character }) {
  const [{ username, token }, dispatch] = useStateValue();
  const favUrl = "/api/favorite";
  const requestHeader = { headers: { Authorization: token } };

  // Set up swr to fetch data dynamically
  const fetcher = (url) =>
    Axios.get(url, requestHeader).then((r) => r.data.favIDs);

  const { data: favIDs } = useSWR(username ? favUrl : null, fetcher);

  // Function to handle add / remove to favorite
  const handleFavorite = async (cid, cname) => {
    // If this character is already one of user's favorites, REMOVE it
    if (favIDs.includes(cid)) {
      const userConfirm = window.confirm(
        `Are you sure you want to remove ${cname} from favorite?`
      );
      if (userConfirm) {
        const removeData = {
          favorite: favIDs.filter((p) => p !== cid),
        };
        await Axios.put(favUrl, removeData, requestHeader)
          .then((res) => console.log("DB updated:", res.data.favIDs))
          .catch((error) => console.log("Failed to update DB:", error));
      }
    }

    // If this character is NOT yet a user's favorite, ADD it
    else {
      const insertData = {
        favorite: favIDs.concat(cid).sort((a, b) => a - b),
      };
      await Axios.put(favUrl, insertData, requestHeader)
        .then((res) => console.log("DB updated:", res.data.favIDs))
        .catch((error) => console.log("Failed to update DB:", error));
    }

    trigger(favUrl);
  };

  return (
    <div
      className={styles.favstar}
      onClick={() => handleFavorite(character.id, character.name)}
    >
      {/* If no favIDs, don't show star at all */}
      {!favIDs ? null : favIDs.includes(character.id) ? ( // If favIDs data exist, show start status
        <div title="Remove from favorite">
          <StarIcon color="primary" />
        </div>
      ) : (
        <div title="Add to favorite">
          <StarBorderIcon color="disabled" />
        </div>
      )}
    </div>
  );
}
