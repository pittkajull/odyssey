import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Quest, QuestStatus } from '../types/course';
import { LandmarkIllustration } from './LandmarkIllustrations';

interface QuestNodeProps {
  quest: Quest;
  status: QuestStatus;
  index: number;
  onClick: () => void;
}

export function QuestNode({ quest, status, index, onClick }: QuestNodeProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'en' ? 'en' : 'id';
  const navigate = useNavigate();
  const isDisabled = status === 'locked';

  const handleClick = () => {
    if (isDisabled) return;
    if ((quest.type === 'checkpoint' || quest.type === 'final_review') && quest.quiz_questions && quest.quiz_questions.length > 0) {
      navigate(`/quiz/${quest.id}`);
    } else {
      onClick();
    }
  };

  return (
    <LandmarkIllustration
      quest={quest}
      status={status}
      index={index}
      onClick={handleClick}
      lang={lang}
    />
  );
}
