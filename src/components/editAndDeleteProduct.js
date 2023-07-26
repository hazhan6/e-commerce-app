import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import withReactContent from "sweetalert2-react-content";
import { default as SweetAlert } from "sweetalert2";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../redux/products";

const Swal = withReactContent(SweetAlert);

const EditAndDeleteProduct = ({ productId, setEditModalOpen }) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleDeleteClick = async () => {
    const result = await Swal.fire({
      title: `${t("Warnings.sureForDelete")}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${t("Warnings.delete")}`,
      cancelButtonText: `${t("Warnings.cancel")}`,
      customClass: {
        confirmButton:
          "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-5",
        cancelButton:
          "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
    });

    if (result.value !== null && result.value === true) {
      try {
        dispatch(deleteProduct({ productId }));
        enqueueSnackbar(`${t("Warnings.deleteProductSuccess")}`, {
          variant: "success",
          preventDuplicate: true,
        });
      } catch (error) {
        enqueueSnackbar(`${t("Warnings.deleteProductFail")}`, {
          variant: "error",
          preventDuplicate: true,
        });
      }
    }
  };

  return (
    <div className="edit-delete-product-dropdown absolute top-8 right-0 bg-white dark:bg-gray-300 border border-gray-300 dark:border-gray-700 p-2 rounded-md shadow-md">
      <button
        onClick={handleEditClick}
        className="flex items-center gap-2 w-full text-left py-1 px-2 text-gray-800 hover:text-gray-100 hover:bg-gray-600"
      >
        <FaEdit />
        {t("Edit")}
      </button>
      <button
        onClick={handleDeleteClick}
        className="flex items-center gap-2 w-full text-left py-1 px-2 text-gray-800 hover:text-gray-100 hover:bg-gray-600"
      >
        <FaTrash />
        {t("Delete")}
      </button>
    </div>
  );
};

export default EditAndDeleteProduct;
