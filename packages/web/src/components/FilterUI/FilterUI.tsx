/*
 * 全てのフィルターを表示するコンポーネント
 */

import type { ClassType, Evaluation, Semester } from "@packages/models";
import { useState } from "react";
import { ClassTypeFilter } from "./FilterComponents/ClassType.tsx";
import { EvaluationFilter } from "./FilterComponents/Evaluation.tsx";
import { Freeword } from "./FilterComponents/Freeword.tsx";
import { RegistrationFilter } from "./FilterComponents/RegistrationFilter.tsx";
import { SemestersCheckbox } from "./FilterComponents/Semester.tsx";
import { FilterCard } from "./UI/FilterCard.tsx";

/**
 *  フィルタの型定義
 */
type Filter = {
  isFreewordForSyllabusDetail?: boolean; // フリーワード検索
  semesters?: Semester[]; // セメスター
  evaluation_included?: Evaluation[]; // 含めたい評価方法
  evaluation_excluded?: Evaluation[]; // 除外したい評価方法
  classTypes?: ClassType[]; // 種別
  showRegistered?: boolean; // 履修登録済みの授業を表示する
  showNotRegistered?: boolean; // 未履修の授業を表示する
};

/**
 *  フィルタUI
 * @returns フィルタUI
 */
export const FilterUI: React.FC = () => {
  // 現在のフィルター
  const [filter, setFilter] = useState<Filter>({});

  return (
    <div className="flex gap-8 flex-wrap">
      <FilterCard title={"フリーワード検索"}>
        <Freeword
          isFreewordForSyllabusDetail={filter.isFreewordForSyllabusDetail}
          setFreewordTarget={(isFreewordForSyllabusDetail) =>
            setFilter({ ...filter, isFreewordForSyllabusDetail })
          }
        />
      </FilterCard>

      <FilterCard title={"セメスター"}>
        <SemestersCheckbox
          selectedSemesters={filter.semesters}
          setSelectedSemesters={(semesters: Semester[]) =>
            setFilter({ ...filter, semesters })
          }
        />
      </FilterCard>

      <FilterCard title={"評価方法"}>
        <EvaluationFilter
          evaluation_included={filter.evaluation_included}
          evaluation_excluded={filter.evaluation_excluded}
          setEvaluation={(
            evaluation_included: Evaluation[],
            evaluation_excluded,
          ) =>
            setFilter({ ...filter, evaluation_included, evaluation_excluded })
          }
        />
      </FilterCard>

      <FilterCard title={"種別"}>
        <ClassTypeFilter
          selectedClassTypes={filter.classTypes}
          setSelectedClassTypes={(classTypes: ClassType[]) =>
            setFilter({ ...filter, classTypes })
          }
        />
      </FilterCard>

      <FilterCard title={"履修登録済み"}>
        <RegistrationFilter
          showRegistered={filter.showRegistered}
          showNotRegistered={filter.showNotRegistered}
          setShowRegistered={(
            showRegistered: boolean,
            showNotRegistered: boolean,
          ) => setFilter({ ...filter, showRegistered, showNotRegistered })}
        />
      </FilterCard>
    </div>
  );
};
