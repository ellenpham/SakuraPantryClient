import api from '../../../configs/api';
import { useState } from 'react';
import { getAxiosErrorMessage } from '../../../utils';
import toast from 'react-hot-toast';
import { ModalBody, ModalFooter, Button, ModalHeader } from '@nextui-org/react';

export default function DeleteCategoryModal({ closeModal, category, fetchData }) {
  const [isDeletingCategory, setIsDeletingCategory] = useState(false);

  const deleteCategory = async (data) => {
    setIsDeletingCategory(true);

    try {
      await api.delete(`/categories/${category.slug}`, data);

      toast.success('Category deleted successfully');

      await fetchData();

      closeModal();
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    } finally {
      setIsDeletingCategory(false);
    }
  };
  return (
    <>
      <ModalHeader>Delete Category</ModalHeader>
      <ModalBody>
        <span>
          If you delete this category, you will not be able to recover it. Are you sure you want to
          delete it?
        </span>
      </ModalBody>
      <ModalFooter>
        <Button color='default' variant='bordered' onPress={closeModal}>
          Cancel
        </Button>
        <Button color='danger' type='submit' onClick={deleteCategory} disabled={isDeletingCategory}>
          Delete Category
        </Button>
      </ModalFooter>
    </>
  );
}