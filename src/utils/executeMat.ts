import { RunMatExecutionError, type ExecuteRequest, type RunMatSessionHandle, type WorkspaceEntry } from "runmat";


export const executeText = async (
  session: RunMatSessionHandle,
  source: string,
  sourceName: string,
  variableName: string,
  options?: Omit<ExecuteRequest, "source">
) => {
  try {
    const result = await session.executeRequest({
      source: {
        kind: 'text',
        name: sourceName,
        text: source
      },
      ...options
    });
    if (result.error) return new Error(result.error.diagnostic);

    const materialize = await materializeEntry(session, result.workspace.values, variableName);
    if (materialize instanceof Error) return materialize;

    return {
      result,
      warnings: result.warnings,
      entries: result.workspace.values,
      ...materialize
    } as const;
  } catch (error) {
    if (error instanceof RunMatExecutionError)
      return new Error(error.diagnostic);

    if (error instanceof Error)
      return error;

    return new Error('unknown error.');
  }
}


export const materializeEntry = async (session: RunMatSessionHandle, entries: WorkspaceEntry[], variableName: string) => {
  try {
    const entry = entries.find(v => v.name === variableName);
    if (!entry)
      return new Error('variable not found.');

    const variable = await session.materializeVariable(
      { name: entry.name },
      { limit: 4096 }
    );

    return {
      variable,
      values: variable.preview?.values ?? [],
      shape: variable.shape
    } as const;
  } catch (error) {
    if (error instanceof RunMatExecutionError)
      return new Error(error.diagnostic);

    if (error instanceof Error)
      return error;

    return new Error('unknown error.');
  }
}
