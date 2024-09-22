declare class ZohoDocumentPageDto {
    image_string: string;
    page: number;
    is_thumbnail: boolean;
}
export declare class ZohoDocumentIdDto {
    image_string: string;
    document_name: string;
    pages: ZohoDocumentPageDto[];
    document_size: number;
    document_order: string;
    is_editable: boolean;
    total_pages: number;
    document_id: string;
}
declare class DocumentFieldDto {
    document_id: string;
    fields: any[];
}
export declare class ZohoActionDto {
    verify_recipient: boolean;
    recipient_countrycode_iso: string;
    action_type: string;
    private_notes: string;
    cloud_provider_name: string;
    recipient_email: string;
    send_completed_document: boolean;
    verification_type: string;
    allow_signing: boolean;
    recipient_phonenumber: string;
    is_bulk: boolean;
    action_id: string;
    cloud_provider_id: number;
    signing_order: number;
    fields: any[];
    recipient_name: string;
    delivery_mode: string;
    action_status: string;
    recipient_countrycode: string;
    in_person_name?: string;
    in_person_email?: string;
}
declare class ZohoRequestsDto {
    request_status: string;
    notes: string;
    reminder_period: number;
    owner_id: string;
    description: string;
    request_name: string;
    modified_time: number;
    is_deleted: boolean;
    expiration_days: number;
    is_sequential: boolean;
    templates_used: any[];
    owner_first_name: string;
    sign_percentage: number;
    owner_email: string;
    created_time: number;
    email_reminders: boolean;
    document_ids: ZohoDocumentIdDto[];
    self_sign: boolean;
    document_fields: DocumentFieldDto[];
    in_process: boolean;
    validity: number;
    request_type_name: string;
    request_id: string;
    request_type_id: string;
    owner_last_name: string;
    actions: ZohoActionDto[];
}
export declare class ZohoResponseDto {
    code: number;
    requests: ZohoRequestsDto;
    message: string;
    status: string;
}
export {};
