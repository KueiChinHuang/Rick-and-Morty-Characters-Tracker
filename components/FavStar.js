import styles from "../styles/favstar.module.css";
import Axios from "axios";
import useSWR, { trigger } from "swr";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { useStateValue } from "../context/StateProvider";

export default function FavStar({ character }) {
  const [{ username, token }, dispatch] = useStateValue();

  const fetcher = (url) =>
    Axios.get(url, {
      headers: {
        Authorization: token,
      },
    }).then((r) => r.data.favIDs);

  const { data: favIDs } = useSWR(username ? "/api/favorite" : null, fetcher);

  const handleFavorite = async (cid, cname) => {
    // If this character is already one of user's favorites, REMOVE it
    if (favIDs.includes(cid)) {
      if (
        window.confirm(
          `Are you sure you want to remove ${cname} from favorite?`
        )
      ) {
        await Axios.put(`/api/favorite`, {
          favorite: favIDs.filter((p) => p !== cid),
        })
          .then((res) => console.log("DB updated:", res.data.data.favorite))
          .catch((error) => console.log("Failed to update DB:", error));
      }
    }

    // If this character is NOT yet a user's favorite, ADD it
    else {
      await Axios.put(`/api/favorite`, {
        favorite: favIDs.concat(cid),
      })
        .then((res) => console.log("DB updated:", res.data.data.favorite))
        .catch((error) => console.log("Failed to update DB:", error));
    }

    trigger(`/api/favorite`);
    // trigger(`/api/user/${user.uid}/favorite`);
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
