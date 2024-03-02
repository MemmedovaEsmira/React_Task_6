import styles from './feedbacks.module.scss'
import logo from '../../assets/images/Vector.png'
import FeedBackItem from '../FeedbackItem/FeedBackItem'
import Input from '../Input/Input'
import { useState } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/Store'
import image from '../../assets/images/Group 16.png'

const Feedbacks = () => {

    const [isActiveModal, setIsActiveModal] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('All')
    const value = useSelector((state: RootState) => state.FeedBacksSliceReducer.value)



    const handleActive = () => {
        setIsActiveModal((prev) => !prev)
    }

    console.log(value)

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category)
    }

    const filteredValue = selectedCategory === 'All' ? value : value.filter((item) =>
        item.category === selectedCategory)

    return (
        <>
            <div className={styles.filter}>

                <div className={styles['filter_title']}>
                    <h2>Front end Mentor</h2>
                    <p>Feedback board</p>
                </div>
                <div className={styles['filter_container']}>
                    <ul className={styles['filter_container_list']}>
                        <li onClick={() => handleCategoryClick('All')}>All</li>
                        <li onClick={() => handleCategoryClick('UI')}>UI</li>
                        <li onClick={() => handleCategoryClick('UX')}>UX</li>
                        <li onClick={() => handleCategoryClick('Enhancement')}>Enhancement</li>
                        <li onClick={() => handleCategoryClick('Bug')}>Bug</li>
                        <li onClick={() => handleCategoryClick('Feature')}>Feature</li>
                    </ul>
                </div>

            </div>

            <div className={classNames(styles['feedback_container'],
                { [styles['feedback_container_active']]: isActiveModal })}>

                <div className={styles['feedback_container_header']}>
                    <div className={styles['feedback_container_header_info']}>
                        <img src={logo} alt="logo" />
                        <h2>{filteredValue.length} Suggestions</h2>
                        <p> <span>Sort by</span> : Most Upvotes</p>
                    </div>

                    <button onClick={handleActive}>+ Add Feedback</button>
                </div>

                {value.length == 0 ?
                 <div className={styles['feedback_empty']}>
                    <img src={image} alt="" />
                    <h2>There is no feedback yet.</h2>
                    <p>Got a suggestion? Found a bug that needs to be squared? <br />
                        We love hearing about new ideas to impove our app.
                    </p>
                    <button onClick={handleActive}>+ Add Feedback</button>
                </div> :

                    filteredValue.map((item) =>
                        <FeedBackItem
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            category={item.category} 
                            description={item.description} />)}
            </div>

            <Input activModal={isActiveModal} setIsActiveModal={setIsActiveModal}/>
        </>

    )
}

export default Feedbacks