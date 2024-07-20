import ReactDOM from "react-dom";
import styles from "./WishlistModal.module.scss";
import { useWishlistContext } from "../../../context/WishlistContext";
import { WishlistItemTypes } from "../../../types/WishlistItemType";
import { useForm } from "react-hook-form";
import ReusableInput from "../../ReusableInput/ReusableInput";
import ReusableSelect from "../../ReusableSelect/ReusableSelect";
import {
  useCreateWishlist,
  useUpdateWishlist,
} from "../../../hooks/useWishlist";

export default function WishlistModal(): JSX.Element {
  const { activeEditWishlist, changeModalState, setActiveEditWishlist } =
    useWishlistContext();
  const { mutate: createMutation, isPending: isCreating } = useCreateWishlist();
  const { mutate: updateMutation, isPending: isUpdating } = useUpdateWishlist();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = activeEditWishlist
    ? useForm<WishlistItemTypes>({
        defaultValues: {
          wishlist_item: activeEditWishlist.wishlist_item,
          priority: activeEditWishlist.priority,
          price: activeEditWishlist.price,
        },
      })
    : useForm<WishlistItemTypes>();

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form
        className={styles.wishlistForm}
        onSubmit={handleSubmit((data) => {
          activeEditWishlist
            ? updateMutation(
                { id: activeEditWishlist._id, formData: data },
                {
                  onSuccess: () => {
                    changeModalState();
                    setActiveEditWishlist(null);
                  },
                }
              )
            : createMutation(data, { onSuccess: changeModalState });
        })}
      >
        <div className={styles.titleWrapper}>
          <h2 className={styles.formHeading}>
            {activeEditWishlist ? "Edit Transacton" : "Add Transaction"}
          </h2>
          <button
            onClick={() => {
              setActiveEditWishlist(null);
              changeModalState();
            }}
          >
            Close
          </button>
        </div>
        <div className={styles.separator}></div>

        <ReusableInput
          register={{
            ...register("wishlist_item", {
              required: "Please enter wishlist item",
            }),
          }}
          error={errors.wishlist_item?.message}
          placeholder="Wishlist item name"
          inputType="text"
        />

        <ReusableInput
          register={{
            ...register("price", {
              required: "Please enter wishlist item price",
            }),
          }}
          error={errors.wishlist_item?.message}
          placeholder="Price"
          inputType="number"
        />

        <ReusableSelect
          register={{
            ...register("priority", { required: "Please provide priority" }),
          }}
          options={["low", "medium", "high"]}
          firstDisabledOption="Priority"
          defaultValue="null"
        />

        <div className={styles.btnWrapper}>
          <button disabled={isCreating || isUpdating}>
            {activeEditWishlist ? "Save changes" : "Add transaction"}
          </button>
          {activeEditWishlist && (
            <button
              className={styles.deleteWishlistItem}
              onClick={async (e) => {
                e.preventDefault();
              }}
            >
              Delete transaction
            </button>
          )}
        </div>
      </form>
    </div>,
    document.querySelector(".global-layout")!
  );
}
