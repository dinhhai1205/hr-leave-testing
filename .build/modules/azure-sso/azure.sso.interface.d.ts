export interface IIdentityProviderOptions {
    sso_login_url: string;
    sso_logout_url: string;
    certificates: string | string[];
    force_authn?: boolean | undefined;
    sign_get_request?: boolean | undefined;
    allow_unencrypted_assertion?: boolean | undefined;
}
export interface IIdentityProvider extends IIdentityProviderOptions {
}
export interface IServiceProvider {
    create_login_request_url(IdP: IIdentityProvider, options: ICreateLoginRequestUrlOptions, cb: (error: Error | null, login_url: string, request_id: string) => void): void;
    redirect_assert(IdP: IIdentityProvider, options: IRedirectAssertOptions, cb: (error: Error | null, response: ISAMLAssertResponse) => void): void;
    post_assert(IdP: IIdentityProvider, options: IPostAssertOptions, cb: (error: Error | null, response: ISAMLAssertResponse) => void): void;
    create_logout_request_url(IdP: IIdentityProvider | string, options: ICreateLogoutRequestUrlOptions, cb: (error: Error | null, request_url: string, request_id: string) => void): void;
    create_logout_response_url(IdP: IIdentityProvider | string, options: ICreateLogoutResponseUrlOptions, cb: (error: Error | null, response_url: string) => void): void;
    create_metadata(): string;
}
export interface IServiceProviderOptions {
    entity_id: string;
    private_key: string;
    certificate: string;
    assert_endpoint: string;
    alt_private_keys?: string[] | undefined;
    alt_certs?: string[] | undefined;
    audience?: string | RegExp | undefined;
    notbefore_skew?: number | undefined;
    force_authn?: boolean | undefined;
    auth_context?: IAuthnContextClassRef | undefined;
    nameid_format?: string | undefined;
    sign_get_request?: boolean | undefined;
    allow_unencrypted_assertion?: boolean | undefined;
}
export interface ICreateLoginRequestUrlOptions {
    relay_state?: string | undefined;
    auth_context?: IAuthnContextClassRef | undefined;
    nameid_format?: string | undefined;
    force_authn?: boolean | undefined;
    sign_get_request?: boolean | undefined;
}
export interface IRedirectAssertOptions {
    request_body: {
        SAMLResponse?: any;
        SAMLRequest?: any;
    };
    allow_unencrypted_assertion?: boolean | undefined;
    require_session_index?: boolean | undefined;
}
export interface IPostAssertOptions extends IRedirectAssertOptions {
    audience?: string | RegExp | undefined;
    notbefore_skew?: number | undefined;
}
export interface ICreateLogoutRequestUrlOptions {
    name_id?: string | undefined;
    session_index?: string | undefined;
    allow_unencrypted_assertion?: boolean | undefined;
    sign_get_request?: boolean | undefined;
    relay_state?: string | undefined;
}
export interface ICreateLogoutResponseUrlOptions {
    in_response_to?: string | undefined;
    sign_get_request?: boolean | undefined;
    relay_state?: string | undefined;
}
export interface ISAMLAssertResponse {
    response_header: {
        id: string;
        destination: string;
        in_response_to: string;
    };
    type: string;
    user: {
        name_id: string;
        email?: string;
        given_name?: string;
        name?: string;
        upn?: string;
        common_name?: string;
        group?: string;
        role?: string;
        surname?: string;
        ppid?: string;
        authentication_method?: string;
        deny_only_group_sid?: string;
        deny_only_primary_sid?: string;
        deny_only_primary_group_sid?: string;
        group_sid?: string;
        primary_group_sid?: string;
        primary_sid?: string;
        windows_account_name?: string;
        session_index?: string | undefined;
        session_not_on_or_after?: string | undefined;
        attributes?: {
            [attr: string]: string | string[];
        } | undefined;
    };
}
export interface IAuthnContextClassRef {
    comparison: string;
    class_refs: string[];
}
