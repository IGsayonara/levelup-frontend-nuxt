/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginDto {
  /** @example "noffirl" */
  username: string;
  /** @example "test22848" */
  password: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterDto {
  username: string;
  password: string;
}

export interface EmptyResponseDto {
  /** @example 204 */
  status: number;
}

export interface SkillResponseDto {
  /** @example 1 */
  id: number;
  /** @example "JavaScript" */
  title: string;
}

export interface ProjectSkillResponseDto {
  /** @example 1 */
  id: number;
  skill: SkillResponseDto;
  /** @example "description" */
  description: string;
}

export interface ProjectResponseDto {
  /** @example 1 */
  id: number;
  /** @example "Project title" */
  title: string;
  /** @example "Project description" */
  description: string;
  projectSkills: ProjectSkillResponseDto[];
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface UserProjectSkillResponseDto {
  /** @example 1 */
  id: number;
  skill: SkillResponseDto;
  /** @example "Brief description" */
  description: string;
}

export interface UserProjectResponseDto {
  /** @example 1 */
  id: number;
  project: ProjectResponseDto;
  /** @example "Front-End" */
  role: string;
  /** @example "Brief description" */
  description: string;
  skills: UserProjectSkillResponseDto[];
}

export interface UserSkillResponseDto {
  /** @example 1 */
  id: number;
  skill: SkillResponseDto;
  /** @format date-time */
  learnedAt: string;
  /** @example "Brief description" */
  description: string;
}

export interface UserResponseDTO {
  /** @example 1 */
  id: number;
  /** @example "noffirl" */
  username: string;
  userProjects: UserProjectResponseDto[];
  userSkills: UserSkillResponseDto[];
  /** @example "Ihor" */
  firstName: string;
  /** @example "Didunik" */
  lastName: string;
  /** @example "diduniki@gmail.com" */
  email: string;
  /** @example "undefined/image.jpg" */
  profileImage: string;
  /** @example "bio in html format" */
  bio: string;
  /** @example "+353-(085)-194-55-49" */
  phoneNumber: string;
  /** @example "Bulgaria, Varna" */
  address: string;
  /** @format date-time */
  dateOfBirth: string;
}

export interface UpdateUserProfileDto {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  bio: string;
  phoneNumber: string;
  address: string;
  /** @format date-time */
  dateOfBirth: string;
}

export interface CreateProjectDto {
  /** @example "Crypto Wallet" */
  title: string;
  /** @example "Amazing de-fi application bla bla bla" */
  description?: string;
  /** @example "Amazing de-fi application..." */
  shortDescription?: string;
}

export interface UpdateUserProjectDto {
  /** @example "Back-End" */
  role: string;
  /** @example "Brief description" */
  description: string;
  /** @example "Brief description" */
  shortDescription: string;
}

export interface UpdateUserSkillDto {
  /** @example "Description" */
  description: string;
  /** @format date-time */
  learnedAt: string;
}

export interface CreateUserProjectSkilDto {
  /** @example 1 */
  userProjectId: number;
  /** @example 1 */
  skillId: number;
}

export interface UpdateUserProjectSkillDto {
  /** @example "Description" */
  description: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Levelup API
 * @version 1.0
 * @contact
 *
 * This is a swagger documentation for levelup API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerLogin
     * @request POST:/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerRegister
     * @request POST:/auth/register
     * @secure
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Authentication
     * @name AuthControllerRefreshTokens
     * @request POST:/auth/refresh
     * @secure
     */
    authControllerRefreshTokens: (params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/auth/refresh`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  users = {
    /**
     * No description
     *
     * @tags Users
     * @name UserControllerFindCurrent
     * @request GET:/users/me
     * @secure
     */
    userControllerFindCurrent: (params: RequestParams = {}) =>
      this.request<UserResponseDTO, any>({
        path: `/users/me`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UserControllerFindOne
     * @request GET:/users/{username}
     */
    userControllerFindOne: (username: string, params: RequestParams = {}) =>
      this.request<any, UserResponseDTO>({
        path: `/users/${username}`,
        method: "GET",
        ...params,
      }),
  };
  userProfile = {
    /**
     * No description
     *
     * @tags UserProfile
     * @name UserProfileControllerUpdateOne
     * @request PUT:/userProfile/general
     * @secure
     */
    userProfileControllerUpdateOne: (data: UpdateUserProfileDto, params: RequestParams = {}) =>
      this.request<any, UserResponseDTO>({
        path: `/userProfile/general`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserProfile
     * @name UserProfileControllerUploadFile
     * @request PUT:/userProfile/profileImage
     * @secure
     */
    userProfileControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/userProfile/profileImage`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),
  };
  projects = {
    /**
     * No description
     *
     * @tags Projects
     * @name ProjectControllerUpdateOne
     * @request PUT:/projects/{id}
     * @secure
     */
    projectControllerUpdateOne: (id: number, params: RequestParams = {}) =>
      this.request<ProjectResponseDto, any>({
        path: `/projects/${id}`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  userProject = {
    /**
     * No description
     *
     * @tags User - Project
     * @name UserProjectControllerAddOne
     * @request POST:/userProject
     * @secure
     */
    userProjectControllerAddOne: (data: CreateProjectDto, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, void>({
        path: `/userProject`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User - Project
     * @name UserProjectControllerUpdateOne
     * @request PUT:/userProject/{id}
     * @secure
     */
    userProjectControllerUpdateOne: (id: number, data: UpdateUserProjectDto, params: RequestParams = {}) =>
      this.request<UpdateUserProjectDto, any>({
        path: `/userProject/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User - Project
     * @name UserProjectControllerDeleteOne
     * @request DELETE:/userProject/{id}
     * @secure
     */
    userProjectControllerDeleteOne: (id: number, params: RequestParams = {}) =>
      this.request<any, void | EmptyResponseDto>({
        path: `/userProject/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  skills = {
    /**
     * No description
     *
     * @tags Skills
     * @name SkillControllerFindAll
     * @request GET:/skills
     */
    skillControllerFindAll: (params: RequestParams = {}) =>
      this.request<SkillResponseDto[], any>({
        path: `/skills`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Skills
     * @name SkillControllerFindOne
     * @request GET:/skills/{id}
     */
    skillControllerFindOne: (id: number, params: RequestParams = {}) =>
      this.request<SkillResponseDto, void>({
        path: `/skills/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
  userSkill = {
    /**
     * No description
     *
     * @tags User - Skill
     * @name UserSkillControllerAddOne
     * @request POST:/userSkill/{skillId}
     * @secure
     */
    userSkillControllerAddOne: (skillId: number, params: RequestParams = {}) =>
      this.request<UserSkillResponseDto, void>({
        path: `/userSkill/${skillId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User - Skill
     * @name UserSkillControllerUpdateOne
     * @request PUT:/userSkill/{id}
     * @secure
     */
    userSkillControllerUpdateOne: (id: number, data: UpdateUserSkillDto, params: RequestParams = {}) =>
      this.request<UserSkillResponseDto, any>({
        path: `/userSkill/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags User - Skill
     * @name UserSkillControllerDeleteOne
     * @request DELETE:/userSkill/{id}
     * @secure
     */
    userSkillControllerDeleteOne: (id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, any>({
        path: `/userSkill/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  userProjectSkill = {
    /**
     * No description
     *
     * @tags UserProject - Skill
     * @name UserProjectSkillControllerAddOne
     * @request POST:/userProjectSkill
     * @secure
     */
    userProjectSkillControllerAddOne: (data: CreateUserProjectSkilDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/userProjectSkill`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserProject - Skill
     * @name UserProjectSkillControllerUpdateOne
     * @request PUT:/userProjectSkill/{id}
     * @secure
     */
    userProjectSkillControllerUpdateOne: (id: number, data: UpdateUserProjectSkillDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/userProjectSkill/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserProject - Skill
     * @name UserProjectSkillControllerDeleteOne
     * @request DELETE:/userProjectSkill/{id}
     * @secure
     */
    userProjectSkillControllerDeleteOne: (id: number, params: RequestParams = {}) =>
      this.request<EmptyResponseDto, void>({
        path: `/userProjectSkill/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),
  };
}
