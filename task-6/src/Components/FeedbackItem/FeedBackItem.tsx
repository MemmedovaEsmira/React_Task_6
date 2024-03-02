import styles from './feedbackItem.module.scss'
import { TbMessageCircle2Filled } from "react-icons/tb";
import { FC } from 'react';

interface IFeedbackItem {
  title: string;
  description: string;
  id: number;
  category: string;
}

const FeedBackItem: FC<IFeedbackItem> = ({ title, description, id, category }) => {
  return (

    <>
      <div className={styles.feedback_item}>
        <div className={styles.feedback_item_content}>
          <div className={styles['item_content']}>
            <h3 className={styles['item_content_title']}>{title}</h3>
            <p className={styles['item_content_category']}>{category}</p>
            <p className={styles['item_content_description']} >{description}</p>
          </div>
          <div className={styles['item_content_comments']}>
            <TbMessageCircle2Filled className={styles['item_content_comments_icon']} />
            <span>2</span>
          </div>

        </div>

      </div>
    </>

  )
}

export default FeedBackItem