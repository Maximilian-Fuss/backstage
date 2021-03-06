/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { useApi } from '@backstage/core';
import { useParams } from 'react-router-dom';
import { useAsync } from 'react-use';
import { githubActionsApiRef } from '../../api';

export const useWorkflowRunsDetails = ({
  hostname,
  owner,
  repo,
}: {
  hostname?: string;
  owner: string;
  repo: string;
}) => {
  const api = useApi(githubActionsApiRef);
  const { id } = useParams();
  const details = useAsync(async () => {
    return repo && owner
      ? api.getWorkflowRun({
          hostname,
          owner,
          repo,
          id: parseInt(id, 10),
        })
      : Promise.reject('No repo/owner provided');
  }, [repo, owner, id]);
  return details;
};
