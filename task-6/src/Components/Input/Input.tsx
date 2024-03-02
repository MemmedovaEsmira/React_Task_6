import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './input.module.scss';
import { FC } from 'react';
import { IoIosArrowUp } from "react-icons/io";
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Store';
import { addFeedback } from '../../Store/FeedBacksSlice';

interface Input {
  activModal: boolean;
  setIsActiveModal: Dispatch<SetStateAction<boolean>>;
}

const Input: FC<Input> = ({ activModal, setIsActiveModal }) => {
  const [isActive, setIsActive] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  
  const value = useSelector((state: RootState) => state.FeedBacksSliceReducer.value)
  
  const [feedObj, setFeedObj] = useState({
      title: '',
      description: '',
      category: '',
      id: 1,
    })

  const [feedTitle, setFeedTitle] = useState({})
  const [feedDesc, setFeedDesc] = useState({})
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()


  const handleActive = () => {
    setIsActive((prev) => !prev)
  }

  // console.log(activModal)

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {

    setFeedTitle((prev) => ({
      ...prev,
      title: e.target.value
    }));
    setTitleError(false)
  }

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedDesc((prev) => ({
      ...prev, description: e.target.value
    }))

    setDescError(false)
  }


  useEffect(() => {
    setFeedObj((prev) => ({
      ...prev,
      ...feedTitle,
      ...feedDesc,
      category
    })

    )
    setCategoryError(false)

  }, [feedTitle, feedDesc, category])
  console.log(value)

  const handleCategory=(category:string)=>{
  setCategory(category)
  setIsActive((prev) => !prev)
  }

  const handleAddFeedBack = () => {
    if (!feedObj.title.trim()) {
      setTitleError(true)
      return
    }
    else {
      setTitleError(false)
    }
    if (!feedObj.description.trim()) {

      setDescError(true)
      return
    } else {
      setDescError(false)
    }
    if (!feedObj.category) {

      setCategoryError(true)
      return
    } 
    else {
      setCategoryError(false)
    }

    const newId = feedObj.id + 1;

    setFeedObj(prev => ({
      ...prev,
      id: newId,
    }))

    dispatch(
      addFeedback({
        ...feedObj,
        id: newId
      })
    )

    setFeedObj({
      title:'',
      description:'',
      category:'',
      id: newId

    })

    setFeedTitle({});
    setFeedDesc({});
    setCategory('')
  }


  const handleCancel = () => {
    setIsActiveModal(false)
    setFeedObj({
      title: '',
      description: '',
      category: '',
      id: feedObj.id + 1
    })
    setFeedTitle({});
    setFeedDesc({});
    setCategory('')
  }


  return (
    <>
      <div className={classNames(styles['input_modal'], { [styles['input_modal_active']]: activModal })}>

        <div className={styles['input_modal_plus']}>
          <button>+</button>
        </div>

        <div className={styles['input_modal_content']}>
          <div className={styles['input_modal_content_heading']}>Create New Feetback</div>
          <div className={styles['input_modal_content_title']}>
            <label htmlFor='title'>Feedback Title</label>
            <span>add shot title descr</span>
            <input type="text" id='title' onChange={handleTitle} value={feedObj.title} className={classNames({ [styles['title_error_active']]: titleError })} />
            {titleError && <p className={styles['input_title_error']}>Cant't be empty</p>}
          </div>

          <div className={styles['input_modal_content_category']}>
            <div className={styles['input_modal_content_category_title']}>
              <p>Category</p>
              <span>choose category</span>

              <div className={classNames(styles['input_modal_content_category_title_setted'], { [styles['category_error_active']]: categoryError })} onClick={handleActive}>
                <p>{category}</p>
                <span><IoIosArrowUp className={classNames(styles['category_icon'], { [styles['icon_active']]: isActive })} /></span></div>
            </div>
            {categoryError && <p className={styles['category_error']}>Cant'be empty</p>}

            <ul className={classNames(styles['input_modal_content_category_list'], { [styles['list_active']]: isActive })}>
              
              <li onClick={() => handleCategory('Feature')}>Fature</li>
              <li onClick={() => handleCategory('UI')}>UI</li>
              <li onClick={() => handleCategory('UX')}>UX</li>
              <li onClick={() => handleCategory('Enhancement')}>Enhancement</li>
              <li onClick={() => handleCategory('Bug')}>Bug</li>
            </ul>
          </div>

          <div className={styles['input_modal_content_feed_detail']}>
            <label htmlFor="text">Feedback Detail</label>
            <span>Include any spesific comments on what should be improved ,added ,etc.</span>
            <textarea id='text' onChange={handleDescription} value={feedObj.description} className={classNames({ [styles['input_error_active']]: descError })} />
            {descError && <p className={styles['description_error']}> Cant't be empty </p>}
          </div>

          <div className={styles['input_modal_content_buttons']}>
            <button className={styles.cancel} onClick={handleCancel}>Cancel</button>
            <button className={styles.add} onClick={handleAddFeedBack}>Add feedback</button>
          </div>

        </div>

      </div>
    </>
  )
}

export default Input;