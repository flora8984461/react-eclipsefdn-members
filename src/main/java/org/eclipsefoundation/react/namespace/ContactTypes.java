package org.eclipsefoundation.react.namespace;

import com.fasterxml.jackson.annotation.JsonValue;

public enum ContactTypes {
    WORKING_GROUP("working_group"), COMPANY("company"), MARKETING("marketing"), ACCOUNTING("accounting");

    private String dbValue;

    private ContactTypes(String dbValue) {
        this.dbValue = dbValue;
    }

    @JsonValue
    public String getValue() {
        return dbValue;
    }
}
